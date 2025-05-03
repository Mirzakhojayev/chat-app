import { useState } from "react";
import { useChatStore } from "../store/storeUserChat.js";
import { Send, Image } from "lucide-react";

const MessageInput = () => {
    const [text, setText] = useState("");
    const { sendMessage } = useChatStore();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await sendMessage({ text: text.trim() });

            setText("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 w-full">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button type="button" className={`hidden sm:flex btn btn-circle`}>
                        <Image size={20} />
                    </button>
                </div>
                <button type="submit" className="btn btn-circle" disabled={!text.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;