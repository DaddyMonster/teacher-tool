import { useCallback, useMemo, useRef } from "react";
import {
  TextScoreInfoFragment,
  useAnalyseVocabProunMutation,
} from "../../generated/gql";

interface Props {
  text: string;
  fileName: string;
}

export interface VoiceReportState {
  reportData: TextScoreInfoFragment | null;
}

export interface VoiceReportAction {
  analyseVocBlob: (blob: Blob) => void;
}

const useVocVoiceReport = ({
  text,
  fileName,
}: Props): [VoiceReportState, VoiceReportAction] => {
  const [analyse, { data, error }] = useAnalyseVocabProunMutation();

  const onceRef = useRef(false);
  const analyseVocBlob = useCallback(
    async (blob: Blob) => {
      if (onceRef.current) {
        return;
      }
      onceRef.current = true;

      const file = new File([blob], "file" + fileName);
      const { data, errors } = await analyse({
        variables: {
          file,
          input: { text },
        },
      });

      onceRef.current = false;
    },
    [text, onceRef]
  );

  const vocVoiceState = useMemo(
    () => ({
      reportData: data?.analyseVocabPron.text_score ?? null,
    }),
    [data]
  );

  return [vocVoiceState, { analyseVocBlob }];
};

export default useVocVoiceReport;
