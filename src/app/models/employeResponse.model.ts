// Employe response˝
export interface EmployeeResponse {
    id: string,
    first_name: string,
    last_name: string,
    gender: string,
    dob: string,
    email: string,
    phone: string,
    website: string,
    address: string,
    status: string,
    _links: {
      self: {
        href: string
      },
      avatar: {
        href: string
      }
    }
  }