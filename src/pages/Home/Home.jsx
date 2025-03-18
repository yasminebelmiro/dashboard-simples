import React, { useEffect, useState } from "react";
import { Grid, HomeContainer, Row } from "./style";
import { FaCarSide, FaGift, FaHouse, FaUmbrellaBeach } from "react-icons/fa6";
import Summary from "../../components/Summary/Summary";
import Card from "../../components/Card/Card";
import Category from "../../components/Category/Category";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { GiHealthNormal } from "react-icons/gi";
import { data } from "../../service/data";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const Home = () => {
  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartDataEntrie, setChartDataEntrie] = useState([]);
  const [chartDataExits, setChartDataExits] = useState([]);

  const COLORS = ["#4CAF50", "#FFBB28", "#FF8042", "#0088FE", "#A28BE7"];

  useEffect(() => {
    // 🔹 Calcular total de entradas e saídas
    const totalValue = data.reduce(
      (acc, item) => {
        if (item.type === "entrada") {
          acc.entries += item.value;
        } else {
          acc.exits += item.value;
        }
        return acc;
      },
      { entries: 0, exits: 0 }
    );

    setEntries(totalValue.entries);
    setExits(totalValue.exits);
    setBalance(totalValue.entries - totalValue.exits);

    // 🔹 Organizar dados por mês
    const monthlyData = {};

    data.forEach((item) => {
      const month = item.month;
      if (!monthlyData[month]) {
        monthlyData[month] = { month, entries: 0, exits: 0 };
      }

      if (item.type === "entrada") {
        monthlyData[month].entries += item.value;
      } else {
        monthlyData[month].exits += item.value;
      }
    });

    setChartData(Object.values(monthlyData));

    // 🔹 Agrupar entradas por categoria
    const sumEntries = {};
    const sumExits = {};

    data.forEach((item) => {
      if (item.type === "entrada") {
        if (!sumEntries[item.category]) {
          sumEntries[item.category] = { category: item.category, total: 0 };
        }
        sumEntries[item.category].total += item.value;
      } else if (item.type === "saida") {
        if (!sumExits[item.category]) {
          sumExits[item.category] = { category: item.category, total: 0 };
        }
        sumExits[item.category].total += item.value;
      }
    });

    // 🔹 Selecionar o Top 5 categorias
    const top5Entries = Object.values(sumEntries)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const top5Exits = Object.values(sumExits)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    setChartDataEntrie(top5Entries);
    setChartDataExits(top5Exits);
  }, []);

  return (
    <HomeContainer>
      {/* 🔹 Resumo dos valores */}
      <Row>
        <Summary text="Saldo" amountValue={balance} />
        <Summary text="Entradas" amountValue={entries} />
        <Summary text="Despesas" amountValue={exits} />
      </Row>

      <div>
        <Row>
          {/* 🔹 Gráfico Top 5 Entradas */}
          <Card text="Top 5 Entradas por categoria">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartDataEntrie}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#4CAF50"
                  name="Total por Categoria"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* 🔹 Gráfico de Pizza de Despesas */}
          <Card text="Top 5 Despesas por categoria">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartDataExits}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#FF5722"
                  label
                >
                  {chartDataExits.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Row>

        <Row>
          {/* 🔹 Gráfico de Evolução Mensal */}
          <Card text="Evolução mensal: despesas vs entradas">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 30, right: 10, left: 10, bottom: 0 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entries" fill="#4CAF50" name="Entradas" />
                <Bar dataKey="exits" fill="#F44336" name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* 🔹 Gráfico de Pizza Geral por Categoria */}
          <Card text="Distribuição por Categorias">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[...chartDataEntrie, ...chartDataExits]}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {[...chartDataEntrie, ...chartDataExits].map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Row>
      </div>
    </HomeContainer>
  );
};

export default Home;
