import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: 'v4'
})
export default async (req, res) => {
    const {type, name, } = JSON.parse(req.body)
    const fileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: name,
        Expires: 600,
        ContentType: type,
        ACL: 'public-read'
    }
    console.log(fileParams)
    const url = await s3.getSignedUrlPromise('putObject', fileParams)

    res.statusCode = 200
    res.json({url})
}