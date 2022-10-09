import $api from "../http";

export class OrganizationService {
  static createEmployee(employee: any) {
    return $api.post("", employee);
  }

  static deleteEmployee(id: number) {
    return $api.delete(``);
  }
}
