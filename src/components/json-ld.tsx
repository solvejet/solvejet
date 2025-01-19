import { memo } from 'react'

interface JsonLDProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

const JsonLD = ({ data }: JsonLDProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

export default memo(JsonLD)
