import { ICategory } from "@/src/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface Proptypes {
  title: string;
  categories: ICategory[];
  isLoading: boolean;
}

const HomeCategoryList = (props: Proptypes) => {
  const { title, categories, isLoading } = props;
  return (
    <Card className="mx-6 lg:mx-0 lg:p-5">
      <CardHeader className="text-xl font-bold text-danger-500">
        {title}
      </CardHeader>
      <CardBody>
        <div className="grid auto-cols-[10rem] grid-flow-col gap-4 overflow-x-auto p-1 lg:grid-cols-8 lg:gap-6">
          {!isLoading
            ? categories.map((category: ICategory) => (
                <Link
                  key={`${category._id}`}
                  href={`/event?category=${category._id}`}
                >
                  <Card shadow="sm">
                    <CardBody className="flex flex-col items-center gap-2">
                      <Image
                        src={`${category.icon}`}
                        alt={`${category.name}`}
                        width={1920}
                        height={800}
                      />
                      <p className="font-bold">{category.name}</p>
                    </CardBody>
                  </Card>
                </Link>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`category-skeleton-${index}`}
                  className="flex flex-col items-center gap-2"
                >
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeCategoryList;
