const getNombreRoles = (roles) => {
  return roles.map(({ nombre }) => nombre).toString()
}

export const employeesListAdapter = (data) => {
  return data.map((item) => ({
    ...item,
    roles: getNombreRoles(item.roles)
  }))
}
