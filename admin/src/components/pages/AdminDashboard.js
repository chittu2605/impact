import React, { useState, useEffect } from "react";
import { Slate } from "../atoms/Slate";
import { StatisticCard } from "../atoms/StatisticCard";
import { ChampionClub } from "../organisms/ChampionClub";
import { LeadersClub } from "../organisms/LeadersClub";
import { OnePlusOneElevenClub } from "../organisms/OnePlusOneElevenClub";
import { MEBClub } from "../organisms/MEBClub";
import { Grid } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

import { apiHandler } from "../../utils/apiConfig";

export const AdminDashboard = () => {
  const [totalTurnover, setTotalTurnover] = useState("");
  const [monthlyTurnover, setMonthlyTurnover] = useState("");
  const [totalMoney, setTotalMoney] = useState("");
  const [monthlyMoney, setMonthlyMoney] = useState("");
  const [totalAdp, setTotalAdp] = useState("");
  const [newAdp, setNewAdp] = useState("");
  const [newJoiningBV, setNewJoiningBV] = useState("");

  useEffect(() => {
    getTotalTurnover();
    getMontlyTurnover();
    getTotalMoney();
    getMonthlyMoney();
    getTotalAdp();
    getNewAdp();
    getNewJoiningBV();
  }, []);

  const getTotalTurnover = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/total-turnover`);
      setTotalTurnover(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMontlyTurnover = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/monthly-turnover`);
      setMonthlyTurnover(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalMoney = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/total-money`);
      setTotalMoney(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlyMoney = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/monthly-money`);
      setMonthlyMoney(res.data);
      const totalAmt = parseInt(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAdp = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/total-adp`);
      setTotalAdp(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewAdp = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/new-adp`);
      setNewAdp(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewJoiningBV = async (adpId) => {
    try {
      const res = await apiHandler.get(`/admin/new-joining-bv`);
      setNewJoiningBV(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Slate>
      <h1>Admin Dashboard</h1>
      <Grid
        container
        spacing={2}
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "1rem",
          margin: "auto",
          width: "90%",
        }}
      >
        <Grid item xs={3}>
          <StatisticCard
            value={totalTurnover}
            cardColor="blue"
            title="Total Turnover"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={3}>
          <StatisticCard
            value={totalMoney}
            cardColor="blue"
            title="Total BV Till Date"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={3}>
          <StatisticCard
            value={totalAdp}
            cardColor="blue"
            title="Total ADP"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={3}>
          <StatisticCard
            value={monthlyTurnover}
            cardColor="blue"
            title="Month Turnover"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={3}>
          <StatisticCard
            value={monthlyMoney}
            cardColor="blue"
            title="Month BV"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={3}>
          <StatisticCard
            value={newAdp}
            cardColor="blue"
            title="New Joinings"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={3}>
          <StatisticCard
            value={newJoiningBV}
            cardColor="blue"
            title="New Joinings BV"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12}></Grid>
        <Grid item xs={3}>
          <ChampionClub monthMoney={monthlyMoney} />
        </Grid>
        <Grid item xs={3}>
          <LeadersClub monthMoney={monthlyMoney} />
        </Grid>
        <Grid item xs={3}>
          <OnePlusOneElevenClub monthMoney={monthlyMoney} />
        </Grid>
        <Grid item xs={3}>
          <MEBClub monthMoney={monthlyMoney} />
        </Grid>
      </Grid>
    </Slate>
  );
};

export default AdminDashboard;
