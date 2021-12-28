import React, { useState } from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useData } from "../DataContext";
import  MainContainer  from "./MainContainer";
import PrimaryButton from "./PrimaryButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

const useStyles = makeStyles({
    root: {
      marginBottom: "30px",
    },
    table: {
      marginBottom: "30px",
    },
  });

const Result = () => {
    const [success, setSucces] = useState(false);
    const {data} = useData();   
    const {files} = data;
    const entries = Object.entries(data).filter(entry => entry[0] !== "files");
    const styles = useStyles();

    const onSubmit = async () => {
        const formData = new FormData();
        if(data.files){
            data.files.forEach(file => {
                formData.append("files", file, file.name);
            })
        }
        entries.forEach(entry => {
            formData.append(entry[0], entry[1]);
        })

        const response = await fetch("http://localhost:4000/", {
            method: "POST",
            body: formData
        })

        if(response.status === 200){
            Swal.fire("Great job", "You send the data successfully!", "success");
            setSucces(true);
        }
    }

    if(success){
        return (
            <Confetti />
        )
    }

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                RESULT
            </Typography>
            <TableContainer className={styles.root} component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries?.map(entry => (
                            <TableRow key={entry[0]}>
                                <TableCell>{entry[0]}</TableCell>
                                <TableCell align="right">{entry[1]?.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {files && (
                <>
                    <Typography component="h2" variant="h5">
                        Files
                    </Typography>
                    <List>
                        {files.map((file, index) =>(
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile />
                                </ListItemIcon>
                                <ListItemText primary={file.name} secondary={file.size}/>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <PrimaryButton onClick={onSubmit}>Upload Data</PrimaryButton>
            <Link to="/">Start Over</Link>
        </MainContainer>
    );
};

export default Result;