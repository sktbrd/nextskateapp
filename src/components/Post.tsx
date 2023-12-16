"use client"

import {
  Card,
  CardHeader,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { Discussion } from "@hiveio/dhive"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import PostAvatar from "./PostAvatar"
import PostImage from "./PostImage"

interface PostProprieties {
  post?: Discussion
}

export default function Post({ post }: PostProprieties): ReactElement {
  const postMetadata = post ? JSON.parse(post.json_metadata) : {}
  const postAuthor = post?.author || ""
  const router = useRouter()

  return (
    <Card
      size="sm"
      boxShadow="none"
      borderRadius="lg"
      _hover={{
        outline: "1px solid",
        outlineColor: "gray.100",
      }}
    >
      <CardHeader mt={2} pb={0}>
        <Flex gap="4">
          <Flex flex="1" gap="2" alignItems="center">
            <PostAvatar
              name={postAuthor}
              src={`https://images.ecency.com/webp/u/${postAuthor}/avatar/small`}
            />
            <Flex flexDir="column" gap={0}>
              <Flex gap={1} alignItems="center">
                <Text fontSize="14px" as="b">
                  {post?.author}
                </Text>
                <Text fontSize="14px" color="darkgray">
                  ·
                </Text>
                <Text fontSize="12px" color="darkgray" fontWeight="300">
                  {post && formatTimeSince(post?.created)}
                </Text>
              </Flex>
              <Text fontSize="14px" noOfLines={1}>
                {post?.title}
              </Text>
            </Flex>
          </Flex>
          <Tooltip label="Open post">
            <IconButton
              onClick={() => router.push("post" + post?.url)}
              aria-label="Return"
              icon={<ExternalLink size={16} color="darkgray" />}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
        </Flex>
      </CardHeader>
      <PostImage
        src={(postMetadata?.image && postMetadata.image[0]) || ""}
        alt={post?.title || ""}
        linkUrl={post ? "post" + post.url : "#"}
      />
    </Card>
  )
}

function formatTimeSince(dateString: string): string {
  const postDate = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - postDate.getTime()

  const minutes = Math.floor(diffMs / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) {
    return `${minutes}m`
  } else if (hours < 24) {
    return `${hours}h`
  } else {
    const day = postDate.getDate()
    const monthNames: string[] = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ]
    const month = monthNames[postDate.getMonth()]
    return `${day} ${month}`
  }
}