const employees = [
  {
    id: 1,
    firstName: "Aarav",
    email: "employee1@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Prepare Q2 Report",
        description: "Collect and analyze all Q2 performance metrics.",
        date: "2025-06-03",
        category: "Reports"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Update CRM Database",
        description: "Ensure all client contact info is up to date.",
        date: "2025-05-28",
        category: "Data Management"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Client Onboarding Session",
        description: "Assist in setting up a new client's onboarding process.",
        date: "2025-06-01",
        category: "Client Services"
      }
    ]
  },
  {
    id: 2,
    firstName: "Neha",
    email: "employee2@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 0,
      completed: 2,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Design Landing Page",
        description: "Create a draft for the new summer campaign page.",
        date: "2025-06-04",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Fix UI Bugs",
        description: "Resolve user interface issues on dashboard.",
        date: "2025-06-02",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "QA Testing",
        description: "Test mobile app features on Android and iOS.",
        date: "2025-05-31",
        category: "QA"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Prepare Training Slides",
        description: "Missed the deadline for HR training slides.",
        date: "2025-05-27",
        category: "Training"
      }
    ]
  },
  {
    id: 3,
    firstName: "Rohan",
    email: "employee3@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Team Meeting Prep",
        description: "Prepare talking points for weekly team sync.",
        date: "2025-06-05",
        category: "Management"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Organize Files",
        description: "Archive old project files in shared drive.",
        date: "2025-06-01",
        category: "Admin"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Email Campaign",
        description: "Missed deadline on email blast for promo.",
        date: "2025-05-30",
        category: "Marketing"
      }
    ]
  },
  {
    id: 4,
    firstName: "Ishita",
    email: "employee4@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Customer Feedback Review",
        description: "Summarize customer feedback for product review.",
        date: "2025-06-04",
        category: "Support"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Survey Analysis",
        description: "Analyze survey results from last quarter.",
        date: "2025-05-29",
        category: "Research"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Social Media Plan",
        description: "Didn't submit Q3 social media content calendar.",
        date: "2025-05-31",
        category: "Marketing"
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        title: "Budget Forecast",
        description: "Estimate expenses for Q3 marketing campaign.",
        date: "2025-06-06",
        category: "Finance"
      }
    ]
  },
  {
    id: 5,
    firstName: "Karan",
    email: "employee5@example.com",
    password: "123",
    taskNumbers: {
      active: 2,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Security Audit",
        description: "Start internal audit of security protocols.",
        date: "2025-06-05",
        category: "IT"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Hardware Upgrade",
        description: "Replace outdated machines in support team.",
        date: "2025-06-01",
        category: "Operations"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Vendor Meeting",
        description: "Did not attend scheduled vendor meeting.",
        date: "2025-05-28",
        category: "Procurement"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Server Maintenance",
        description: "Monitor and update system patches.",
        date: "2025-06-05",
        category: "IT"
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        title: "Firewall Configuration",
        description: "Apply new firewall rules.",
        date: "2025-06-06",
        category: "IT"
      }
    ]
  }
];


const admin = [
  {
    id: 1,
    email: "admin@me.com",
    password: "123",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};
export const getLocalStorage = () => {
  const employee = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return {employees, admin}
};
