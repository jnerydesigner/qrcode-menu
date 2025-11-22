import { Category } from '@infra/database/mongo/schema/category.schema';
import { Ingredient } from '@infra/database/mongo/schema/ingredient.schema';
import { Product } from '@infra/database/mongo/schema/product.schema';
import { Company } from '@infra/database/mongo/schema/company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) { }

  async run() {
    console.log('🌱 Iniciando seed...');

    // await this.categoryModel.deleteMany();
    // await this.ingredientModel.deleteMany();

    // await this.categoryModel.insertMany([
    //   { name: 'Drinks', slug: 'drinks' },
    //   { name: 'Lanches', slug: 'lanches' },
    //   { name: 'Porções', slug: 'porcoes' },

    //   // Novas categorias para barzinho:
    //   { name: 'Cervejas', slug: 'cervejas' },
    //   { name: 'Bebidas Quentes', slug: 'bebidas-quentes' },
    //   { name: 'Caipirinhas', slug: 'caipirinhas' },
    //   { name: 'Drinks Clássicos', slug: 'drinks-classicos' },
    //   { name: 'Coquetéis Especiais', slug: 'coqueteis-especiais' },
    //   { name: 'Shots', slug: 'shots' },
    //   { name: 'Sucos', slug: 'sucos' },
    //   { name: 'Refrigerantes', slug: 'refrigerantes' },
    //   { name: 'Drinks Sem Álcool', slug: 'drinks-sem-alcool' },

    //   { name: 'Petiscos', slug: 'petiscos' },
    //   { name: 'Fritas e Aperitivos', slug: 'fritas-e-aperitivos' },
    //   { name: 'Espetinhos', slug: 'espetinhos' },
    //   { name: 'Tirinhas e Iscas', slug: 'tiras-e-iscas' },
    //   { name: 'Tabua de Frios', slug: 'tabua-de-frios' },

    //   { name: 'Hambúrgueres', slug: 'hamburgueres' },
    //   { name: 'Sanduíches', slug: 'sanduiches' },
    //   { name: 'Caldos', slug: 'caldos' },

    //   { name: 'Sobremesas', slug: 'sobremesas' },
    // ]);

    // await this.ingredientModel.insertMany([
    //   { name: 'Carne', emoji: '🥩', color: 'bg-amber-900', slug: 'carne' },
    //   { name: 'Pão', emoji: '🍞', color: 'bg-amber-600', slug: 'pao' },
    //   { name: 'Queijo', emoji: '🧀', color: 'bg-yellow-400', slug: 'queijo' },
    //   { name: 'Tomate', emoji: '🍅', color: 'bg-red-500', slug: 'tomate' },
    //   { name: 'Alface', emoji: '🥬', color: 'bg-green-500', slug: 'alface' },
    //   { name: 'Bacon', emoji: '🥓', color: 'bg-rose-600', slug: 'bacon' },
    //   { name: 'Ovo', emoji: '🥚', color: 'bg-gray-300', slug: 'ovo' },
    //   { name: 'Cebola', emoji: '🧅', color: 'bg-purple-500', slug: 'cebola' },
    //   { name: 'Batata', emoji: '🥔', color: 'bg-yellow-700', slug: 'batata' },
    //   { name: 'Pepino', emoji: '🥒', color: 'bg-green-400', slug: 'pepino' },
    //   { name: 'Cenoura', emoji: '🥕', color: 'bg-orange-500', slug: 'cenoura' },
    //   { name: 'Frango', emoji: '🍗', color: 'bg-amber-700', slug: 'frango' },
    //   { name: 'Peixe', emoji: '🐟', color: 'bg-blue-400', slug: 'peixe' },
    //   { name: 'Camarão', emoji: '🦐', color: 'bg-pink-400', slug: 'camarao' },
    //   {
    //     name: 'Molho Barbecue',
    //     emoji: '🍖',
    //     color: 'bg-red-800',
    //     slug: 'molho-barbecue',
    //   },
    //   { name: 'Ketchup', emoji: '🍅', color: 'bg-red-600', slug: 'ketchup' },
    //   {
    //     name: 'Mostarda',
    //     emoji: '🌭',
    //     color: 'bg-yellow-500',
    //     slug: 'mostarda',
    //   },
    //   { name: 'Picles', emoji: '🥒', color: 'bg-green-600', slug: 'picles' },
    //   {
    //     name: 'Cogumelo',
    //     emoji: '🍄',
    //     color: 'bg-stone-500',
    //     slug: 'cogumelo',
    //   },
    //   { name: 'Abacaxi', emoji: '🍍', color: 'bg-yellow-600', slug: 'abacaxi' },
    //   { name: 'Presunto', emoji: '🍖', color: 'bg-rose-700', slug: 'presunto' },
    //   { name: 'Salame', emoji: '🥩', color: 'bg-amber-800', slug: 'salame' },
    //   {
    //     name: 'Azeitona',
    //     emoji: '🫒',
    //     color: 'bg-green-700',
    //     slug: 'azeitona',
    //   },
    //   { name: 'Maionese', emoji: '🥫', color: 'bg-gray-200', slug: 'maionese' },
    //   {
    //     name: 'Molho de Alho',
    //     emoji: '🧄',
    //     color: 'bg-stone-300',
    //     slug: 'molho-de-alho',
    //   },
    //   {
    //     name: 'Molho Picante',
    //     emoji: '🌶️',
    //     color: 'bg-red-700',
    //     slug: 'molho-picante',
    //   },
    //   {
    //     name: 'Molho de Queijo',
    //     emoji: '🧀',
    //     color: 'bg-yellow-500',
    //     slug: 'molho-de-queijo',
    //   },
    //   { name: 'Milho', emoji: '🌽', color: 'bg-yellow-400', slug: 'milho' },
    //   { name: 'Ervilha', emoji: '🫛', color: 'bg-green-500', slug: 'ervilha' },
    //   { name: 'Arroz', emoji: '🍚', color: 'bg-stone-100', slug: 'arroz' },
    //   { name: 'Feijão', emoji: '🫘', color: 'bg-amber-700', slug: 'feijao' },
    //   { name: 'Lombo', emoji: '🍖', color: 'bg-amber-900', slug: 'lombo' },
    //   { name: 'Linguiça', emoji: '🌭', color: 'bg-rose-500', slug: 'linguica' },
    //   {
    //     name: 'Abobrinha',
    //     emoji: '🥒',
    //     color: 'bg-green-500',
    //     slug: 'abobrinha',
    //   },
    //   {
    //     name: 'Berinjela',
    //     emoji: '🍆',
    //     color: 'bg-purple-600',
    //     slug: 'berinjela',
    //   },
    //   { name: 'Rúcula', emoji: '🥗', color: 'bg-green-600', slug: 'rucula' },
    //   { name: 'Pimenta', emoji: '🌶️', color: 'bg-red-500', slug: 'pimenta' },
    //   { name: 'Limão', emoji: '🍋', color: 'bg-yellow-300', slug: 'limao' },
    //   { name: 'Morango', emoji: '🍓', color: 'bg-pink-500', slug: 'morango' },
    //   { name: 'Uva', emoji: '🍇', color: 'bg-purple-700', slug: 'uva' },
    //   { name: 'Maçã', emoji: '🍎', color: 'bg-red-400', slug: 'maca' },
    //   { name: 'Banana', emoji: '🍌', color: 'bg-yellow-400', slug: 'banana' },
    //   { name: 'Manga', emoji: '🥭', color: 'bg-orange-400', slug: 'manga' },
    //   { name: 'Abacate', emoji: '🥑', color: 'bg-green-400', slug: 'abacate' },
    //   {
    //     name: 'Queijo Gorgonzola',
    //     emoji: '🧀',
    //     color: 'bg-sky-300',
    //     slug: 'queijo-gorgonzola',
    //   },
    //   {
    //     name: 'Parmesão',
    //     emoji: '🧀',
    //     color: 'bg-yellow-300',
    //     slug: 'parmesao',
    //   },
    //   {
    //     name: 'Molho Pesto',
    //     emoji: '🌿',
    //     color: 'bg-green-500',
    //     slug: 'molho-pesto',
    //   },
    //   {
    //     name: 'Molho Tártaro',
    //     emoji: '🥫',
    //     color: 'bg-gray-300',
    //     slug: 'molho-tartaro',
    //   },
    //   { name: 'Mel', emoji: '🍯', color: 'bg-amber-400', slug: 'mel' },
    //   { name: 'Nozes', emoji: '🌰', color: 'bg-amber-700', slug: 'nozes' },
    //   {
    //     name: 'Amendoim',
    //     emoji: '🥜',
    //     color: 'bg-amber-600',
    //     slug: 'amendoim',
    //   },
    //   {
    //     name: 'Molho de Soja',
    //     emoji: '🍶',
    //     color: 'bg-stone-700',
    //     slug: 'molho-de-soja',
    //   },
    //   {
    //     name: 'Salsicha',
    //     emoji: '🌭',
    //     color: 'bg-orange-700',
    //     slug: 'salsicha',
    //   },
    //   {
    //     name: 'Molho Ranch',
    //     emoji: '🥣',
    //     color: 'bg-gray-100',
    //     slug: 'molho-ranch',
    //   },
    //   { name: 'Tofu', emoji: '🍥', color: 'bg-stone-200', slug: 'tofu' },
    //   {
    //     name: 'Pepperoni',
    //     emoji: '🍕',
    //     color: 'bg-red-600',
    //     slug: 'pepperoni',
    //   },
    //   {
    //     name: 'Molho de Tomate',
    //     emoji: '🍅',
    //     color: 'bg-red-500',
    //     slug: 'molho-de-tomate',
    //   },
    //   {
    //     name: 'Molho de Pimenta',
    //     emoji: '🌶️',
    //     color: 'bg-rose-600',
    //     slug: 'molho-de-pimenta',
    //   },
    //   { name: 'Alho', emoji: '🧄', color: 'bg-stone-400', slug: 'alho' },
    //   { name: 'Couve', emoji: '🥬', color: 'bg-green-700', slug: 'couve' },
    //   {
    //     name: 'Broto de Feijão',
    //     emoji: '🌱',
    //     color: 'bg-green-400',
    //     slug: 'broto-de-feijao',
    //   },
    // ]);

    const categoryDrink = await this.categoryModel.findOne({ slug: 'drinks' });
    const companyHamburgueria = await this.companyModel.findOne({ slug: 'hamburgueria-da-vila' });
    const cuboDeGelo = await this.ingredientModel.findOne({ slug: 'cubo-de-gelo' });

    // Drop the obsolete 'id' index if it exists to prevent duplicate key errors on null values
    try {
      await this.productModel.collection.dropIndex('id_1');
      console.log('✅ Index id_1 dropped successfully');
    } catch (error) {
      // Ignore error if index doesn't exist
      if (error.code !== 27) {
        console.log('⚠️ Note: Index id_1 not found or could not be dropped (this is usually fine)');
      }
    }

    // await this.productModel.deleteMany();

    const productsToSeed = [
      {
        name: 'Coca-Cola',
        slug: 'coca-cola',
        price: 5.0,
        image: 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png',
        category: categoryDrink?._id,
        company: companyHamburgueria?._id,
        ingredients: [cuboDeGelo?._id],
      },
      {
        name: 'Fanta',
        slug: 'fanta',
        price: 5.0,
        image: 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png',
        category: categoryDrink?._id,
        company: companyHamburgueria?._id,
        ingredients: [cuboDeGelo?._id],
      },
      {
        name: 'Sprite',
        slug: 'sprite',
        price: 5.0,
        image: 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png',
        category: categoryDrink?._id,
        company: companyHamburgueria?._id,
        ingredients: [cuboDeGelo?._id],
      },
      {
        name: 'Guarana',
        slug: 'guarana',
        price: 5.0,
        image: 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png',
        category: categoryDrink?._id,
        company: companyHamburgueria?._id,
        ingredients: [cuboDeGelo?._id],
      },
      {
        name: 'Água',
        slug: 'agua',
        price: 2.0,
        image: 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png',
        category: categoryDrink?._id,
        company: companyHamburgueria?._id,
        ingredients: [cuboDeGelo?._id],
      },
    ];

    for (const product of productsToSeed) {
      await this.productModel.deleteOne({ slug: product.slug });
      await this.productModel.updateOne(
        { slug: product.slug },
        { $set: product },
        { upsert: true },
      );
    }

    console.log('✅ Seed finalizado!');
  }
}
