import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { primaryColor } from "../lib/constants.js";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";

export default function RoomCard({ id, img, title, dates }) {
  return (
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
          </CardContent>
          <div
            className={` border-black  text-sm font-semibold  px-[16px] mb-5 `}
          >
            From {dates[0]} to {dates[dates.length - 1]}
          </div>
        </CardActionArea>
      </Link>
    </Card>
  );
}
