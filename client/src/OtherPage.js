import React from "react";
import { Card, Grid, CardContent, CardMedia, Typography } from "@mui/material";
import { Email, LinkedIn, GitHub, Mail, Phone } from "@mui/icons-material";
import medisc from "./medisc.png"
import ebs from "./ebs.png";
const page = () => {
  return (
    <div>
      <Grid container spacing="30px" sx={{ mt: "35px" }}>
        <Grid item>
          <Card
            sx={{
              height: "85vh",
              width: "18vw",
              ml: "10px",
              overflow: "hidden",
              position: "fixed",
              borderRadius: "10px",
            }}
          ><CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={medisc}
            alt="Profile"
            style={{
              width: "50%",
              height: "20%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div style={{ marginTop: "15px" }}>
          <Mail sx={{ marginRight: "1px" }} />
          easwardsharma@gmail.com
        </div>
        <div style={{ marginTop: "15px", display: "flex", alignItems: "center" }}>
          <Phone sx={{ marginRight: "5px", marginBottom: "2px",color:"#11ba2a" }} />
          +919398816022
        </div>
          <div style={{ marginTop: "15px" }}>
            <a href="https://www.linkedin.com/your-linkedin-profile">
              <LinkedIn />
            </a>
          </div>
          <div style={{ marginTop: "15px" }}>
            <a href="https://www.github.com/your-github-profile">
              <GitHub sx={{ color: "#000000" }}  />
            </a>
          </div>
          <div style={{ marginTop: "20px" }}>
            <a href="https://www.example.com/project2">Source code</a>
          </div>
          <div style={{ marginTop: "20px" }}>
            <a href="https://www.example.com/project2">Project 2</a>
          </div>
        </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ height: "40vh", width: "68vw", mb: "20px", ml: "20vw" }}>
            <CardContent sx={{ padding: "25px", textAlign: "left" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: "5px" }}>
                Hi, I'm
                <span style={{ color: "#fd7070" }}> Easwar Dwadasi</span>
              </Typography>
              <Typography sx={{ fontSize: 17 }}>
                I'm a software engineer based in Hyderabad, India. I have 2
                years of experience in building webpages, web applications and 2
                years experience in building IOT Systems.
              </Typography>
              <p></p>
              <Typography>
                The <span style={{ color: "#fd7070" }}>Application:</span> this
                uses pokeAPI to fetch details. Only the pokemon names are stored
                in the postgres database. The table data is fetched from the
                cache. This application works on four individual services in the
                background namely - server, worker, nginx , UIclient.{" "}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: "64vw", ml: "20vw", mb: "10px", padding: "2vw" }}>
            <Typography variant="h6" component="h2">
              High Level Overview
            </Typography>
            <CardMedia
              component="img"
              src={ebs}
              alt="EBS Image"
              sx={{
                margin: "5px",
                objectFit: "contain",
                height: "auto",
                width: "100%",
                maxWidth: "50vw",
                ml: "20px",
              }}
            />
            <CardContent>
              <Typography variant="body1" component="p" textAlign="left">
                <span style={{ color: "#fd7070" }}> client</span> works on react
                js with mui library and is responsible of all UI content.
              </Typography>
              <Typography variant="body1" component="p" textAlign="left">
                <span style={{ color: "#fd7070" }}> server</span> handles all
                routing reqs. when searched for a pokemon it saves the name in
                to db and inserts to redis type cache channel.
              </Typography>
              <Typography variant="body1" component="p" textAlign="left">
                <span style={{ color: "#fd7070" }}> worker</span> handles the
                api calls. it is subscribed to redis channel. whenever a name is
                inserted into the channel, it pairs the name with a standard
                value, nothing yet! first and then it triggers an api call to
                fetch details. Thus response is seen earlier than the response
                from the api.
              </Typography>{" "}
              <Typography variant="body1" component="p" textAlign="left">
                {" "}
                <span style={{ color: "#fd7070" }}> nginx</span> handles the
                static file serving* and networking( additionally proxy passing,
                url rewrites)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default page;
