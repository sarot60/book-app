import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  }
}

@ValidatorConstraint({ name: "UserExists", async: true })
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async validate(value: any, args: ValidationArguments) {
    const filter = {};
    filter[args.property] = value;
    const count = await this.userModel.exists(filter);
    return !count;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is already taken`;
  }
}
