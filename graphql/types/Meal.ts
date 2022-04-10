import { extendType, objectType } from 'nexus';
import { User } from './User';

export const Meal = objectType({
  name: 'Meal',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('description');
    t.list.string('ingredients');
    t.int('kcal');
    t.string('image');
    t.string('category');
    t.list.field('users', {
      type: User,
      async resolve(parent, _args, ctx) {
        return (
          await ctx.prisma.meal.findUnique({ where: { id: parent.id! } }).users()
        )
      }
    })
  }
})

export const MealsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('meals', {
      type: 'Meal',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.meal.findMany();
      }
    })
  }
})
