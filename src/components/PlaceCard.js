import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import DeleteDialogModal from "./DeleteDialog";

export default function PlaceCard({
  placeId,
  name,
  country,
  description,
  image,
  date,
}) {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={image} srcSet={image} loading="lazy" alt="" />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link href="#multiple-actions" overlay underline="none">
            {name}
          </Link>
        </Typography>
        <Typography level="body-sm">
          <Link href="#multiple-actions">{country}</Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-sm">6.3k views</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-sm">{date}</Typography>
          <Divider orientation="vertical" />
          <IconButton
            aria-label="More options"
            size="small"
            sx={{ marginLeft: "auto" }}
          >
            <DeleteDialogModal placeId={placeId} />
          </IconButton>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
