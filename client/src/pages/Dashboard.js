import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";

function Dashboard() {
    // Context
    const { user } = useContext(UserContext);

    return (
        <Grid>
            <h1>Dashboard</h1>
            <h2>Welcome back, {user.name}</h2>

        </Grid>
    );
}

const Grid = styled.div`
`
export default Dashboard;