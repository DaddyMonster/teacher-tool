import { Query, Resolver } from "type-graphql";

@Resolver()
export class ConnectionTester {
  @Query(() => String)
  connectionTest() {
    return "Connection Test Succesful";
  }
}
