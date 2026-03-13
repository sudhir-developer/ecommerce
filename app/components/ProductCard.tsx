import Image from "next/image";
import Link from "next/link";
interface CardProps{
  _id?: string,
  title?: string;
  price?: number;
  category?: string;
  pro_description?:string;
  thumbnail?: string;
}

export default function ProductCard({_id, title, price, category,pro_description, thumbnail,}:CardProps) {
    return(
        <>
         <Link href={`/products/${_id}`}>
        <div className="border rounded-lg p-4 hover:shadow-lg">
        {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title || "product"}
          width={300}
          height={200}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center rounded-md">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <h3 className="font-bold mt-2">
       {title}
      </h3>
      <p className="text-gray-600"><b>{category}</b></p>
      <p className="text-gray-800 font-bold">₹{price}</p>
      <p className="text-gray-800">{pro_description?.slice(0, 100)}{(pro_description?.length ?? 0) > 100 ? "..." : ""}</p>
      <button className="mt-3 w-full bg-black text-white py-2 rounded">
        Add to Cart
      </button>
    </div>
    </Link>
        </>
    )
}