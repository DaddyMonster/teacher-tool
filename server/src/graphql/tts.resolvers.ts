import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class TTsResolver {
  @Query()
  getOrCreateTTs(@Arg("text") _text: string) {
    const text = _text.trim();
    
  }
}
