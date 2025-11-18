import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const companies = [
  {
    id: 1,
    name: "TechVision Inc",
    email: "contact@techvision.com",
    industry: "Technology",
    location: "Ap",
    employeeCount: 500,
    foundedYear: 2018,
    status: "Active",
  },
  {
    id: 2,
    name: "CloudSync Solutions",
    email: "info@cloudsync.com",
    industry: "Cloud Computing",
    location: "Nellore",
    employeeCount: 250,
    foundedYear: 2019,
    status: "Active",
  },
  {
    id: 3,
    name: "DataFlow Analytics",
    email: "hello@dataflow.com",
    industry: "Data Analytics",
    location: "Hyderabad",
    employeeCount: 180,
    foundedYear: 2020,
    status: "Active",
  },
  {
    id: 4,
    name: "SecureNet Systems",
    email: "support@securenet.com",
    industry: "Cybersecurity",
    location: "Boston",
    employeeCount: 120,
    foundedYear: 2017,
    status: "Inactive",
  },
  {
    id: 5,
    name: "AI Innovations Lab",
    email: "contact@ailab.com",
    industry: "Artificial Intelligence",
    location: "kammam",
    employeeCount: 75,
    foundedYear: 2021,
    status: "Active",
  },
  {
    id: 6,
    name: "Mobile Dynamics",
    email: "info@mobiledyn.com",
    industry: "Mobile Development",
    location: "Mumbai",
    employeeCount: 95,
    foundedYear: 2019,
    status: "Active",
  },
  {
    id: 7,
    name: "GreenEnergy Corp",
    email: "hello@greenenergy.com",
    industry: "Renewable Energy",
    location: "Denver",
    employeeCount: 340,
    foundedYear: 2016,
    status: "Pending",
  },
  {
    id: 8,
    name: "FinTech Ventures",
    email: "contact@fintech.com",
    industry: "Financial Technology",
    location: "Chennai",
    employeeCount: 210,
    foundedYear: 2018,
    status: "Active",
  },
  {
    id: 9,
    name: "HealthTech Plus",
    email: "support@healthtech.com",
    industry: "Healthcare Technology",
    location: "bhopal",
    employeeCount: 160,
    foundedYear: 2020,
    status: "Active",
  },
  {
    id: 10,
    name: "E-Commerce Hub",
    email: "info@ecommercehub.com",
    industry: "E-Commerce",
    location: "Los Angeles",
    employeeCount: 420,
    foundedYear: 2015,
    status: "Active",
  },
  {
    id: 11,
    name: "Design Studios Pro",
    email: "hello@designstudio.com",
    industry: "Design",
    location: "banglore",
    employeeCount: 65,
    foundedYear: 2019,
    status: "Active",
  },
  {
    id: 12,
    name: "Media Stream Networks",
    email: "contact@mediastream.com",
    industry: "Media & Entertainment",
    location: "Goa",
    employeeCount: 310,
    foundedYear: 2017,
    status: "Inactive",
  },
  {
    id: 13,
    name: "IoT Solutions World",
    email: "support@iotsolutions.com",
    industry: "Internet of Things",
    location: "Kerala",
    employeeCount: 140,
    foundedYear: 2020,
    status: "Active",
  },
  {
    id: 14,
    name: "Blockchain Technologies",
    email: "info@blockchain.com",
    industry: "Blockchain",
    location: "Kolkata",
    employeeCount: 85,
    foundedYear: 2021,
    status: "Pending",
  },
  {
    id: 15,
    name: "Logistics Prime",
    email: "hello@logisticsprime.com",
    industry: "Logistics",
    location: "Kollam",
    employeeCount: 550,
    foundedYear: 2014,
    status: "Active",
  },
];

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.get("/companies", (req, res) => {
  res.json(companies);
});

app.get("/companies/:id", (req, res) => {
  const company = companies.find((c) => c.id === parseInt(req.params.id));
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

app.post("/companies", (req, res) => {
  const newCompany = {
    id: Math.max(...companies.map((c) => c.id)) + 1,
    ...req.body,
  };
  companies.push(newCompany);
  res.status(201).json(newCompany);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
