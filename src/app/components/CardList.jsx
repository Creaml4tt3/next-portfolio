import Image from "next/image";

export default function CardList({ card, handleDelete }) {
  return (
    <li
      key={card?._id}
      id={card?._id}
      className="CardList flex w-full items-center justify-start gap-2 rounded-lg bg-grey_08 px-3 py-2"
    >
      <Image
        src={card.image ? `/images/${card.image}` : "/images/"}
        alt={card.alt ? card.alt : "No Alt"}
        width={40}
        height={40}
        loading="lazy"
        className="CardListImage"
      />
      <span className="CardListName flex-1 uppercase text-blue">
        {card.name ? card.name : "ไม่ค้นพบชื่อ"}
      </span>
      <span className="CardListLevel text-white">
        {card.level ? card.level : "N"}
      </span>
      <span className="CardListDes line-clamp-1 flex-1 text-xs text-white">
        {card.des ? card.des : "ไม่ค้นพบคำอธิบาย"}
      </span>
      <a href={`/cards/${card?._id}`} className="CardListDel text-blue">
        Edit
      </a>
      <button
        className="CardListDel text-red-600"
        onClick={() => handleDelete(card._id)}
      >
        Del
      </button>
    </li>
  );
}
