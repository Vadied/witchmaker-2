const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User 1",
    email: "user@nextmail.com",
    password: "123456",
    campaigns: [
      "410544b2-4001-4271-9855-fec4b6a6441b",
      "410544b2-4001-4271-9855-fec4b6a6443b",
    ],
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    name: "User 2",
    email: "user@nextmail.com",
    password: "123456",
    campaigns: [
      "410544b2-4001-4271-9855-fec4b6a6441b",
      "410544b2-4001-4271-9855-fec4b6a6443b",
    ],
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442c",
    name: "User 3",
    email: "user@nextmail.com",
    password: "123456",
    campaigns: ["410544b2-4001-4271-9855-fec4b6a6441b"],
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
];

const campaigns = [
  {
    id: "ca6260f9-a55e-40be-99e6-56ab5f5d441f",
    name: "Campaign 1",
    description: "Campaign Description",
    start_date: "2021-01-01",
    end_date: "",
    status: "active",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    master: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6443b",
    name: "Campaign 2",
    description: "Campaign Description",
    start_date: "2021-01-01",
    end_date: "2021-03-01",
    status: "ended",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    master: "410544b2-4001-4271-9855-fec4b6a6442b",
  },
];

const classes = [
  {
    id: "410644b2-4001-4271-9855-fec4b6a6441b",
    name: "Barbarian",
    fatherClass: "",
    description: "Barbarian Description",
  },
  {
    id: "410547b2-4001-4271-9855-fec4b6a6441b",
    name: "Path of the Berserker",
    fatherClass: "410644b2-4001-4271-9855-fec4b6a6441b",
    description: "Path of the Berserker Description",
  },
];

const characters = [
  {
    id: "410544b2-4701-4271-9855-fec4b6a6441b",
    name: "Character 1",
    campaign: "410544b2-4001-4271-9855-fec4b6a6443b",
    createdBy: "410544b2-4001-4271-9855-fec4b6a6442a",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    level: 1,
    class: "410644b2-4001-4271-9855-fec4b6a6441b",
  },
];

module.exports = {
  users,
  campaigns,
  classes,
  characters,
};
