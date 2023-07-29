import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { primaryColor } from "../lib/constants.js";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";

export default function RoomCard({
  id,
  img,
  title,
  price,
  location,
  description,
}) {
  return (
    <div className="">
      <Card sx={{ maxWidth: 800, margin: "auto" }}>
        <Link href={`/rooms/${id}`}>
          <CardActionArea className="hover:bg-white">
            <div className="flex shrink">
              <div className="w-1/3">
                <CardMedia
                  component="img"
                  className="h-[225px]"
                  image={img[0]}
                  alt={title}
                />
              </div>
              <div>
                <CardContent>
                  <div className="h-[60px] my-3">
                    <h3 className="capitalize text-black  my-auto text-xl font-semibold ">
                      {title.toLowerCase()}
                    </h3>
                    <h3
                      className={`capitalize  font-normal my-auto text-[${primaryColor}] `}
                    >
                      {location.toLowerCase()}
                    </h3>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    {description.slice(0, 150)}...
                  </Typography>
                </CardContent>
                <div
                  className={` border-black  text-lg font-semibold my-5 px-[16px] text-[${primaryColor}]`}
                >
                  <FaEthereum size={25} className="inline" />
                  {price} Matic{" "}
                  <span className="text-black text-sm font-semibold">
                    / Per Night
                  </span>
                </div>
              </div>
            </div>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}
