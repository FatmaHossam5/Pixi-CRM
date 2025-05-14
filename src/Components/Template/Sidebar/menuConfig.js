
export const menuConfig = {
  landlord: {
    main: [
      { label: 'Dashboard', path: '/dashboard', icon: "fa fa-chart-bar"  },
      { label: 'All Businesses', path: '/businesses', icon: "fa fa-briefcase"  },
      { label: 'Subscriptions', path: '/subscriptions', icon: "fa fa-file-invoice-dollar"},
      { label: 'Packages', path: '/packages', icon: "fa fa-box-open"},
      { label: 'Coupons', path: '/coupons', icon: "fa fa-tags"},
      { label: 'Activations', path: '/activations', icon: "fa fa-toggle-on" },
    ]
  },

  leader: {
    main: [
      { label: 'Dashboard', path: '/contact/dashboard', icon: "fa fa-chart-line" },
      { label: 'Contacts', path: '/contact/contact', icon: "fa fa-address-book"  },
      { label: 'Leads', path: '/contact/lead', icon:"fa fa-user-plus" },
      { label: 'Tasks', path: '/contact/tasks', icon: "fa fa-tasks" },
      { label: 'Settings', path: 'settings-toggle', icon: "fa fa-cog"  }, // acts as a toggle
    ],
    settings: [
      { label: 'Reasons Settings', path: '/settings/reasons', icon: "fa fa-list-alt"  },
      { label: 'Sources Settings', path: '/settings/sources', icon: "fa fa-filter"  },
      { label: 'Tasks Settings', path: '/settings/tasks', icon: "fa fa-tasks"},
      { label: 'Pipeline Settings', path: '/settings/pipeline', icon: "fa fa-project-diagram"},
      { label: 'Users Settings', path: '/settings/users', icon: "fa fa-user-cog"},
      { label: 'Teams Settings', path: '/settings/teams', icon: "fa fa-users" },
      { label: 'Activity Log', path: '/settings/activity-log', icon: "fa fa-history" },
      { label: 'Custom Fields', path: '/settings/custom-fields', icon: "fa fa-th-list" },
    ]
  }
};
