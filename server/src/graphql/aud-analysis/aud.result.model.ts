import { prop } from "@typegoose/typegoose";
import { Field, Float, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
@InputType("AnalysisScoreBaseInput")
class AnalysisScoreBase {
  @Field({ nullable: true })
  @prop()
  stress_level: number;

  @Field(() => [Int])
  @prop({ type: () => [Number] })
  extent: [number, number];

  @Field(() => Float)
  @prop()
  quality_score: number;

  @Field(() => Float, { nullable: true })
  @prop()
  stress_score: number;
}

@ObjectType()
@InputType("PhoneScoreInput")
export class PhoneScore extends AnalysisScoreBase {
  @Field()
  @prop()
  phone: string;

  @Field({ nullable: true })
  @prop()
  sound_most_like: string;
}

@ObjectType()
@InputType("SyllableScoreInput")
export class SyllableScore extends AnalysisScoreBase {
  @Field(() => Int)
  @prop()
  phone_count: number;

  @Field()
  @prop()
  letters: string;
}

@ObjectType()
@InputType("WordScoreInput")
export class WordScore {
  @Field()
  @prop()
  word: string;

  @Field(() => Float)
  @prop()
  quality_score: number;

  @Field(() => [PhoneScore])
  @prop({ type: () => [PhoneScore] })
  phone_score_list: PhoneScore[];

  @Field(() => [SyllableScore])
  @prop({ type: () => [SyllableScore] })
  syllable_score_list: SyllableScore[];
}

@InputType("AudAnalysisResultInput")
@ObjectType()
export class AudAnalysisResult {
  @Field()
  @prop()
  text: string;

  @Field(() => Float)
  @prop()
  quality_score: number;

  @Field(() => [WordScore], { nullable: "items" })
  @prop({ type: () => [WordScore] })
  word_score_list?: WordScore[];

  @Field()
  @prop()
  fidelity_class: string;
}
