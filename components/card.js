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
    <div>
      <Card sx={{ maxWidth: 300 }}>
        <Link href={`/rooms/${id}`}>
          <CardActionArea className="hover:bg-white">
            <CardMedia
              component="img"
              className="h-[200px]"
              image={img[0]}
              alt={title}
            />
            <CardContent>
              <div className="h-[60px] my-3">
                <Typography
                  gutterBottom
                  className="capitalize text-black font-normal my-auto text-xl "
                  component="div"
                >
                  {title.toLowerCase()}
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary">
                {description.slice(0, 150)}...
              </Typography>
            </CardContent>
            <div
              className={` border-black  text-lg font-semibold my-5 px-[16px] text-[${primaryColor}]`}
            >
              <FaEthereum size={25} className="inline" />
              {price}
            </div>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}
