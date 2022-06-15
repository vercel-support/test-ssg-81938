import { GetStaticPropsResult } from "next"

type CatalogHomeHomeProps = {
  data: string[]
}

export default function CatalogHome({ data }: CatalogHomeHomeProps): JSX.Element {
  return (
    <div>
      <p>
        {data.map(message => <span key={message}>{message}</span>)}
        {
          // Here we have items that use 
          // <Link
          //    passHref
          //    href="/catalog/[collectionType]/[collectionPathName]"
          //    as={asPath}
          //  >
          //  </Link> to access the static sites
        }
      </p>
    </div>
  )
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<CatalogHomeHomeProps>> => {
  return {
    props: {
      data: [
        'testing',
        'why',
        'build',
        'is',
        'failing',
        'on',
        'vercel'
      ]
    }
  }
}
