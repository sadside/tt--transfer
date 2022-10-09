import { createEffect, createEvent, createStore, forward } from "effector";
import { OrganizationService } from "../../../services/OrganizationService";

const createEmployeeFx = createEffect<any, any>(async (employee) => {
  try {
    const response = await OrganizationService.createEmployee(employee);

    return response.data;
  } catch (e: any) {
    alert(e.response.data.detail);
  }
});

const deleteEmployeeFx = createEffect<{ id: number }, any>(async ({ id }) => {
  try {
    const response = await OrganizationService.deleteEmployee(id);

    return response.data;
  } catch (e: any) {
    alert(e.response.data.detail);
  }
});

const employeeFormSubmitted = createEvent<any>();

forward({
  from: employeeFormSubmitted,
  to: createEmployeeFx,
});

const $employees = createStore([])
  .on(createEmployeeFx.doneData, (_, employees) => employees)
  .on(deleteEmployeeFx.doneData, (_, employees) => employees);
