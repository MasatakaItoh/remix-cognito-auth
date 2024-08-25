import { AwsCredentialIdentity } from "@smithy/types";
import { createHmac } from "crypto";

const hashSecret = (email: string) => {
  return createHmac("sha256", process.env.COGNITO_USER_POOL_CLIENT_SECRET ?? "")
    .update(email + process.env.COGNITO_USER_POOL_CLIENT_ID)
    .digest("base64");
};

const getCredentials = (): AwsCredentialIdentity | undefined => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID;
  return accessKeyId && secretAccessKey
    ? { accessKeyId, secretAccessKey }
    : undefined;
};

export { hashSecret, getCredentials };
