const getRolsName = (roles) => {
  return roles.map(({ nombre }) => nombre).toString()
}
const getRolsId = (roles) => {
  return roles?.map(({ id }) => id)
}
export const employeesListAdapter = (data) => {
  return data.map((item) => ({
    ...item,
    roles: getRolsName(item.roles)
  }))
}

export const employeeAdapter = (data) => {
  return {
    ...data,
    roles: getRolsId(data.roles)
  }
}
