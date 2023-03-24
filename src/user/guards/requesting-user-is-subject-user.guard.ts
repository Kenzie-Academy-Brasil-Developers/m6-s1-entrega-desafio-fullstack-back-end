import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class RequestingUserIsSubjectUserGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const subjectUserId = parseInt(request.params.userId);
    const requestingUserId = request.user.id;

    if (subjectUserId == requestingUserId) {
      return true;
    }

    throw new HttpException(
      `You are not the subject user`,
      HttpStatus.FORBIDDEN,
    );
  }
}
