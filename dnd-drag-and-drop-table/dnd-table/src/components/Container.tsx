import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card";
import { Column } from "./Column";
import { ItemTypes } from "./ItemTypes";

const style = {
  width: 400,
};

export type ContainerProps = {
  cards: any[];
};

export const Container: FC<ContainerProps> = memo(function Container(
  props: ContainerProps
) {
  const [cards, setCards] = useState(props.cards);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((card) => `${card.id}` === id)[0] as {
        id: number;
        text: string;
      };
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = (id: string, atIndex: number) => {
    const { card, index } = findCard(id);
    setCards((cards) => {
      const copy = [...cards];
      const underCard = copy.splice(atIndex, 1, card);
      copy.splice(index, 1, underCard[0]);
      return copy;
    });
  };

  return (
    <div className="container">
      <Column
        id="column1"
        children={cards.map((card) => (
          <Card
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
            setCards={setCards}
          />
        ))}
      ></Column>
    </div>
  );
});
