import { memo, ReactNode } from "react"
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { ItemTypes } from "./ItemTypes";

export type ColumnProps = {
    children: JSX.Element[] | undefined;
    id: string;
}

export const Column = memo(function COlumn(props: ColumnProps){
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({ name: props.id }),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      }));
    
      return (
        <div ref={drop} className={props.id}>
          {props.children}
        </div>
      );
})