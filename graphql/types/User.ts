import { enumType, objectType } from 'nexus';
import { Meal } from './Meal';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
    t.list.field('meals', {
      type: Meal,
      async resolve(parent, _args, ctx) {
        return (
          await ctx.prisma.user.findUnique({ where: { id: parent.id! } }).meals()
        )
      }
    })
  }
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN']
})
