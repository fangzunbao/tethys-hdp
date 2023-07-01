import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { getTreeList } from 'src/utils/util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(body: CreateCategoryDto) {
    body.id = ((await this.categoryRepository.maximum('id')) || 1) + 1;
    return this.categoryRepository.save(body);
  }

  async findCategoryById(id: number) {
    return await this.categoryRepository.findOne({
      where: { id },
      cache: true,
    });
  }

  async updateCategory(body: UpdateCategoryDto) {
    return await this.categoryRepository.update(body.id, body);
  }

  async removeList(ids: number[]) {
    return await this.categoryRepository.delete(ids);
  }

  async findCategoryTree() {
    const categories = await this.categoryRepository.find({ cache: true });
    return getTreeList(categories, 0, []);
  }
}
