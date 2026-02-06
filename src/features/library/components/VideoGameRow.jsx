import React from "react";
import { useNavigate } from "react-router-dom";
import { HighlightText } from "@/shared/components/HighlightText";
import { YesNoIcon } from "@/shared/components/YesNoIcon";
import { formatDate } from "@/utils/date";



export const VideoGameRow = ({ videoGame, idx, searchQuery, onRowClick, onDelete }) => {
  
    const navigation = useNavigate();

    return (
                    <tr
                  key={videoGame._id}
                  onClick={() => onRowClick(videoGame._id)}
                  className={[
                    "cursor-pointer border-t border-secondary/40",
                    idx % 2 === 0 ? "bg-secondary/5" : "bg-dark/5",
                    "hover:bg-body",
                  ].join(" ")}
                >
                  <td className="px-3 py-2">
                    <HighlightText text={videoGame.title} query={searchQuery} />
                  </td>
                  <td className="px-3 py-2">
                    <HighlightText
                      text={(videoGame.developer || []).join(", ")}
                      query={searchQuery}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <HighlightText
                      text={videoGame.actors || ""}
                      query={searchQuery}
                    />
                  </td>

                  <td className="px-3 py-2">{videoGame.releaseYear}</td>
                  <td className="px-3 py-2">{videoGame.duration}hrs</td>
                  <td className="px-3 py-2">
                    {(videoGame.genres || []).join(", ")}
                  </td>
                  <td className="px-3 py-2">{(videoGame.publisher || []).join(", ") }</td>
                  <td className="px-3 py-2">
                    <HighlightText
                      text={videoGame.series || ""}
                      query={searchQuery}
                    />
                  </td>

                  <td className="px-3 py-2">
                    {videoGame.seriesNum ? `# ${videoGame.seriesNum}` : "N/A"}
                  </td>






                  <td className="px-3 py-2">{videoGame.status == videoGame.status}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="px-3 py-2 rounded-md border"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(videoGame);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
  );
};
