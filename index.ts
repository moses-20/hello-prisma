import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  await prisma.user.create({
    data: {
      name: "Rich",
      email: "hello@prisma.com",
      posts: {
        create: {
          title: "My First Prisma Post",
          body: "Ullamco reprehenderit magna nulla anim duis aliqua minim qui ipsum velit qui dolor aliqua. Consequat elit culpa quis laborum dolor Lorem culpa quis aute aliquip consequat deserunt. Qui minim duis ipsum nisi sint do veniam ex ad. Ipsum aliquip nostrud ipsum amet amet est aute proident sunt nulla labore mollit. Culpa fugiat occaecat enim laborum est proident ex excepteur nulla amet amet pariatur labore. Commodo ad deserunt ex nisi tempor cillum aute aliquip officia aute adipisicing et consequat. Incididunt ullamco reprehenderit ad amet tempor est deserunt sunt eiusmod ea incididunt nisi et irure.",
          slug: "my-first-prisma-post",
        },
      },
    },
  });

  await prisma.post.update({
    where: {
      slug: "my-first-prisma-post",
    },
    data: {
      comments: {
        createMany: {
          data: [
            { comment: "Greatas la posta!" },
            { comment: "Ola no wait o reada moreee!" },
          ],
        },
      },
    },
  });

  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

  console.dir(posts, { depth: Infinity });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
