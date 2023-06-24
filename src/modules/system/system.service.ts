import { Injectable } from '@nestjs/common';
import { SystemCode } from './entities/code.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemDict } from './entities/dict.entity';
import { CreateCodeDto } from './dto/create.code.dto';
import { createPinyin, createUniqueId, getTreeList } from 'src/utils/util';
import { UpdateCodeDto } from './dto/update.code.dto';
import { CreateDictDto } from './dto/create.dict.dto';
import { UpdateDictDto } from './dto/update.dict.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemCode)
    private codeRepository: Repository<SystemCode>,
    @InjectRepository(SystemDict)
    private dictRepository: Repository<SystemDict>,
  ) {}

  async createCode(body: CreateCodeDto) {
    body.id = createUniqueId();
    body.pinyin = createPinyin(body.name)
    return await this.codeRepository.save(body);
  }

  async updateCode(body: UpdateCodeDto) {
    body.name =createPinyin(body.name)
    return await this.codeRepository.update(body.id, body);
  }

  async removeCode(id: string) {
    const children = await this.findCodeChildren(id);
    const ids = [];
    if (children.length && children.length > 0) {
      children.forEach((item) => {
        ids.push(item.id);
      });
      this.removeCodes(ids);
    }

    return await this.codeRepository.delete(id);
  }

  async removeCodes(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      const children = await this.findCodeChildren(ids[i]);
      const idArr = [];
      if (children.length && children.length > 0) {
        children.forEach((item) => {
          idArr.push(item.id);
        });
        this.removeCodes(idArr);
      }
    }
    return await this.codeRepository.delete(ids);
  }

  async findCode() {
    const codeList = await this.codeRepository.find({ cache: true });
    return getTreeList(codeList, null, []);
  }

  async findCodeById(id: string) {
    return await this.codeRepository.find({ where: { id }, cache: true });
  }

  async findCodeChildren(id: string) {
    return await this.codeRepository.find({
      where: { parent: id },
      cache: true,
    });
  }

  // 字典信息
  async createDict(body: CreateDictDto) {
    body.id = createUniqueId();
    body.pinyin =createPinyin(body.name);
    return await this.dictRepository.save(body);
  }

  async updateDict(body: UpdateDictDto) {
    body.name =createPinyin(body.name)
    return await this.dictRepository.update(body.id, body);
  }

  async removeDict(id: string) {
    return await this.dictRepository.delete(id);
  }

  async removeDicts(ids: string[]) {
    return await this.dictRepository.delete(ids);
  }

  async findDict() {
    return await this.dictRepository.find({ cache: true });
  }

  async findDictById(id: string) {
    return await this.dictRepository.find({ where: { id }, cache: true });
  }
}
