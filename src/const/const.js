export const NAVACTIONS = [
  {
    title: 'Dashboard',
    icon: 'pi-home',
    route: '/dashboard',
    user: 'admin'
  },
  {
    title: 'Home',
    icon: 'pi-home',
    route: '/',
    user: 'user'
  },
  {
    title: 'Password reset',
    icon: 'pi-user-edit',
    route: '/password-reset',
    user: 'user'
  },
  {
    title: 'User Manage',
    icon: 'pi-user',
    route: '/manage-user',
    user: 'admin'
  },
  {
    title: 'Student Manage',
    icon: 'pi-user-edit',
    route: '/student-add',
    user: 'admin'
  },
  {
    title: 'Logout',
    icon: 'pi-sign-out',
    route: '/login',
    user: 'common'
  },
  {
    title: 'DB Populate',
    icon: 'pi-sign-out',
    route: '/populate',
    user: 'common'
  }
]

export const DISTRICTS = [
    { id: 1, name: 'Colombo' },
    { id: 2, name: 'Galle' },
    { id: 3, name: 'Gampaha' },
    { id: 4, name: 'Kalutara' },
    { id: 5, name: 'Kandy' },
    { id: 6, name: 'Matale' },
    { id: 7, name: 'Nuwara Eliya' },
    { id: 8, name: 'Gampaha' },
    { id: 9, name: 'Hambantota' },
    { id: 10, name: 'Kalutara' },
    { id: 11, name: 'Jaffna' },
    { id: 12, name: 'Kilinochchi' },
    { id: 13, name: 'Mannar' },
    { id: 14, name: 'Mullaitivu' },
    { id: 15, name: 'Vavuniya' },
    { id: 16, name: 'Ampara' },
    { id: 17, name: 'Batticaloa' },
    { id: 18, name: 'Trincomalee' },
    { id: 19, name: 'Anuradhapura' },
    { id: 20, name: 'Polonnaruwa' },
    { id: 21, name: 'Kurunegala' },
    { id: 22, name: 'Puttalam' },
    { id: 23, name: 'Badulla' },
    { id: 24, name: 'Monaragala' },
    { id: 25, name: 'Ratnapura' }
  ]
  export const AGEGROUPS = ['9-11', '12-13']

  export const STREAMS = ['Essay', 'Art']
  // export const BASEURL = 'https://tequilasl.com:443'
  export const BASEURL = 'http://127.0.0.1:8000'