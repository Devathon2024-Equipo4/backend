import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const letters = [
    {
      content: "Querido Santa, Este año he intentado ser una mejor persona y siempre trato de ayudar a los demás. He sido amable con mi familia y he trabajado duro en la escuela. Mi único deseo es que todos sean felices y que la paz reine en el mundo. Espero que puedas traerme algo especial, pero lo más importante es saber que estás bien y que sigues trayendo alegría a todos los niños. Con mucho cariño, Sofía",
    },
    {
      content: "Dear Santa, This year I have tried my best to be a good person. I've been kind to my family, worked hard at school, and tried to help others whenever I could. My only wish is for everyone to be happy and for peace to fill the world. I hope you can bring me something special, but the most important thing is that you're safe and continue to spread joy to all the children. With love, Max",
    },
    {
      content: "Querido Papai Noel, Este ano tentei ser uma pessoa melhor. Ajudei minha família, fui educado com os amigos e dei o meu melhor na escola. Meu maior desejo é que todos ao meu redor tenham saúde e felicidade. Claro, adoraria ganhar um presente, mas o mais importante é saber que você está bem e que todos os seus ajudantes também. Que sua jornada seja maravilhosa! Com carinho, Lucas",
    },
    {
      content: "サンタさんへ 今年も良い子にしようと努力しました。家族を助け、学校でも頑張り、友達に優しく接しました。今年の願いは、みんなが幸せで健康でいられることです。プレゼントも楽しみにしていますが、一番大切なのは、サンタさんが元気で、世界中の子どもたちに喜びを与え続けていることです。 よろしく、 さくら",
    },
    {
      content: "Querido Santa, Este año he sido muy amable con todos. He ayudado en casa, sido buen estudiante, y siempre trato de hacer sonreír a los demás. Mi único deseo es que mi familia siga feliz y saludable. Si es posible, me gustaría recibir algo que me ayude a ser aún mejor. Gracias por todo lo que haces, ¡te deseo un buen viaje! Con cariño, Carla",
    },
    {
      content: "Dear Santa, I have been good this year and tried my best to help others. I've been nice to my friends and tried hard at school. I hope you are doing well and that all the reindeer are ready for the big night. If possible, I'd love a gift that will help me learn something new. Wishing you a safe and happy journey! Love, Liam",
    },
    {
      content: "Querido Papai Noel, Este ano tentei ser uma pessoa melhor. Ajudei minha família, fui educado com todos e tentei sempre fazer o bem. Meu pedido é que minha família continue unida e feliz. Claro, adoraria ganhar um presente, mas o mais importante é saber que você está bem e que todos os seus ajudantes também. Que sua jornada seja maravilhosa! Com carinho, Alice",
    },
    {
      content: "サンタさんへ 今年は家族を大切にして、友達にも優しくしてきました。学校でも頑張り、みんなと仲良く過ごしました。僕の願いは、みんなが笑顔で過ごせることです。もちろん、プレゼントも楽しみにしていますが、何よりもあなたが元気で安全であることが一番大切です。素敵なクリスマスを！ よろしく、 太郎",
    },
    {
      content: "Querido Santa, He sido una persona que trata de ser amable, ayudar en casa y ser buen compañero. Mi deseo es poder pasar mucho tiempo con mi familia y amigos, y verlos felices. Te agradezco mucho por todo lo que haces y espero que puedas descansar después de tu largo viaje. ¡Feliz Navidad! Con cariño, Martina",
    },
    {
      content: "Dear Santa, I've tried to be a good person this year, helping my family, working hard, and being kind to others. My wish is for good health and happiness for everyone I love. I hope you have enough cookies to keep you energized on your journey. Merry Christmas, and thank you for all the joy you bring! Love, Noah",
    },
    {
      content: "Querido Papai Noel, Tento sempre ser um bom amigo, ajudar em casa e ser educado com todos. Este ano, meu maior desejo é que minha família tenha saúde e paz. Espero que sua viagem seja cheia de alegria, e que todos se divirtam. Que a magia do Natal te acompanhe! Com carinho, Alice",
    },
    {
      content: "サンタさんへ 今年もみんなに優しくして、家族を助け、楽しく過ごしました。私のお願いは、みんなが幸せで健康でいられることです。プレゼントも楽しみにしていますが、一番大切なのはあなたが元気で、世界中の子どもたちに喜びを与え続けていることです。素晴らしいクリスマスを！ よろしく、 優子",
    },
    {
      content: "Querido Santa, Este año he hecho todo lo posible para ser amable y servicial con los demás. He estudiado mucho y ayudado a mi mamá en casa. Mi mayor deseo es que el mundo sea un lugar más amable y lleno de amor. Ojalá puedas traerme algo que me ayude a ser mejor cada día. Te deseo un viaje tranquilo. Con amor, Antonio",
    },
    {
      content: "Dear Santa, I have tried my best to be good this year. I've been helpful to my family, studied hard, and tried to be kind to others. My wish is for everyone to have peace and joy. I would love a gift that helps me grow and learn. Thank you for everything, and safe travels! Love, Olivia",
    },
    {
      content: "Querido Papai Noel, Este ano eu fiz o meu melhor para ser uma pessoa boa. Ajudava em casa, fui educado com todos e tentei sempre fazer o bem. Meu pedido é que minha família continue unida e feliz. Se possível, gostaria de ganhar um presente que me ajude a aprender mais. Agradeço por tudo e desejo uma ótima viagem! Com carinho, Gabriel",
    },
    {
      content: "サンタさんへ 今年も家族や友達と素晴らしい時間を過ごしました。私の願いは、世界中の子どもたちが笑顔で過ごせることです。プレゼントも楽しみにしていますが、何よりもあなたが無事に戻ることを祈っています。素晴らしいクリスマスを！ よろしく、 美咲",
    },
    {
      content: "Querido Santa, He sido una buena persona este año. Ayudé en casa y fui amable con todos mis amigos. Mi deseo es que todos los niños del mundo tengan un hogar lleno de amor. Ojalá puedas traerme un regalo que me haga sonreír. Te deseo una Navidad llena de paz y felicidad. Con cariño, Javier",
    },
    {
      content: "Dear Santa, I have been good this year, trying to be kind to everyone around me. I hope you and the reindeer are ready for Christmas. My wish is that the world becomes a better place, full of kindness and love. I would love a gift that helps me learn and grow. Merry Christmas! Love, Emma",
    },
    {
      content: "Querido Papai Noel, Este ano, fui gentil com todos e sempre procurei ajudar a quem precisa. Meu maior desejo é que minha família esteja sempre feliz e saudável. Que sua viagem seja mágica e segura. Agradeço por tudo o que faz por todos nós. Com carinho, Mariana",
    },
    {
      content: "サンタさんへ 今年も家族や友達と楽しい時間を過ごし、学校でも頑張りました。私のお願いは、みんなが幸せで安全でいることです。もちろん、プレゼントも楽しみにしていますが、一番大切なのはあなたの健康と安全です。素晴らしいクリスマスを！ よろしく、 理沙",
    },
    {
      content: "Querido Santa, Este año he sido muy amable con mis amigos y he trabajado duro en la escuela. Mi mayor deseo es que las personas sean amables unas con otras y que haya paz en el mundo. Si pudieras traerme un regalo, sería genial, pero lo más importante es que todos estén bien. ¡Feliz Navidad! Con amor, Pablo",
    }
  ];

  await prisma.letter.createMany({
    data: letters,
  });

  console.log('Datos de seed agregados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
