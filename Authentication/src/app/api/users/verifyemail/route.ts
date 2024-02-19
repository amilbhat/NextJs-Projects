import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse, userAgent } from "next/server";
import User from "@/models/userModel"

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
        
        const currUser = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if (!currUser) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        currUser.isVerified = true
        currUser.verifyToken = undefined
        currUser.verifyTokenExpiry = undefined
        await currUser.save()

        return NextResponse.json({
            message: "Email verified Successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}