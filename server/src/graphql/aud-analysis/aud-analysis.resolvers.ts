import axios from "axios";
import FormData from "form-data";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { MyContext } from "src/types/context";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { AudAnalysisResult } from "./aud.result.model";

@ObjectType()
export class AnalysisVocabRaw {
  @Field()
  status: string;

  @Field(() => AudAnalysisResult)
  text_score: AudAnalysisResult;
}

@InputType()
class AnalyseVocabPronArgs {
  @Field()
  text: string;
}

@Resolver()
export class AudAnalysisResolver {
  @Mutation(() => AnalysisVocabRaw)
  async analyseVocabPron(
    @Arg("input")
    { text }: AnalyseVocabPronArgs,
    @Arg("audFile", () => GraphQLUpload) file: FileUpload
  ): Promise<AnalysisVocabRaw> {
    try {
      const user_id = `tester-user-${text}`;
      const path = process.env.SPEECH_ACE_URL_BASE!;
      const { createReadStream, filename, mimetype } = file;
      const stream = createReadStream();
      const fd = new FormData();

      fd.append("text", text);
      fd.append("user_audio_file", stream, {
        contentType: mimetype,
        filename,
        knownLength: stream.readableLength,
      });

      const { data } = await axios.post(path, fd, {
        headers: fd.getHeaders(),
        params: {
          key: process.env.SPEECH_ACE_KEY,
          dialect: "en-us",
          user_id,
        },
      });

      return data;
    } catch (err) {
      console.log(err);
      throw new Error("SERVER ERROR");
    }
  }
}
