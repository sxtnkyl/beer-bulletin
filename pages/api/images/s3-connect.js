////API route for secure S3 connection- use with useS3Connect hook
import aws from "aws-sdk";
import nextConnect from "next-connect";
import middleware from "../../../../middleware/auth";
import { v4 as uuidv4 } from "uuid";

let config = {
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  region: process.env.S3_UPLOAD_REGION,
};

let bucket = process.env.S3_UPLOAD_BUCKET;
////update uuid4 to some user associated data
let tempID = uuidv4();

const handler = nextConnect()
  .use(middleware)
  .post((req, res) => {
    let { filename } = req.query;
    let missing = missingEnvs();
    if (missing.length > 0) {
      res.status(500).json({
        error: `S3 Upload: Missing ENVs ${missing.join(", ")}`,
      });
    } else {
      //decide img format- png/jpg
      let key = `${tempID}/${filename}`;

      //JSON format IAM policy
      let policy = {
        Statement: [
          {
            Sid: "Stmt1S3UploadAssets",
            Effect: "Allow",
            //acl for access control list
            //https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html
            Action: ["s3:PutObject", "s3:PutObjectAcl"],
            Resource: [`arn:aws:s3:::${bucket}/${key}`],
          },
        ],
      };

      //temp IAM credentials-
      //https://docs.aws.amazon.com/STS/latest/APIReference/API_GetFederationToken.html
      let sts = new aws.STS(config);

      let token = await sts
        .getFederationToken({
          Name: "S3UploadWebToken",
          Policy: JSON.stringify(policy),
          DurationSeconds: 60 * 60, // 1 hour
        })
        .promise();

      res.statusCode = 200;

      res.status(200).json({
        token,
        key,
        bucket,
        region: process.env.S3_UPLOAD_REGION,
      });
    }
  });

//check env vars
let missingEnvs = () => {
  let keys = [
    "S3_UPLOAD_KEY",
    "S3_UPLOAD_SECRET",
    "S3_UPLOAD_REGION",
    "S3_UPLOAD_BUCKET",
  ];
  return keys.filter((key) => !process.env[key]);
};

export default handler;
