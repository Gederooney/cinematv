import { useRouter } from "next/router";

const Game = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>Slug : {slug}</div>;
};

export default Game;
