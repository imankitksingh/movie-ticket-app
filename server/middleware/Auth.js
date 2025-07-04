import { clerkClient, getAuth } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            console.log("Invalid/missing token:", req.headers.authorization);
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await clerkClient.users.getUser(userId);
        if (user.privateMetadata?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        next();
    } catch (error) {
        console.error("protectAdmin error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
