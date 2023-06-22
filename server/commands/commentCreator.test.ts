import { Event } from "@server/models";
import { buildDocument, buildUser } from "@server/test/factories";
import { setupTestDatabase } from "@server/test/support";
import commentCreator from "./commentCreator";

setupTestDatabase();

describe("commentCreator", () => {
  const ip = "127.0.0.1";

  it("should create comment", async () => {
    const user = await buildUser();
    const document = await buildDocument({
      userId: user.id,
      teamId: user.teamId,
    });

    const comment = await commentCreator({
      documentId: document.id,
      data: { text: "test" },
      user,
      ip,
    });

    const event = await Event.findOne();
    expect(comment.documentId).toEqual(document.id);
    expect(comment.createdById).toEqual(user.id);
    expect(event!.name).toEqual("comments.create");
    expect(event!.modelId).toEqual(comment.id);
  });
});
