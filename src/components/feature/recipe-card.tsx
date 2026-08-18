import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface RecipeData {
  recipe: {
    id: number;
    name: string;
    image_url: string;
    metadata: {
      description: {
        content: { content: { text: string }[] }[];
      };
      recipeYield: string;
      cookTime: number;
      prepTime: number;
      totalTime: number;
    };
    ingredients: {
      quantity: string;
      content: { content: { content: { text: string }[] }[] };
    }[];
    steps: {
      content: { content: { text: string }[] }[];
    }[];
  };
}

export function RecipeCard({ data }: { data: RecipeData }) {
  const { recipe } = data;

  const descriptionText =
    recipe.metadata?.description?.content?.[0]?.content?.[0]?.text;

  return (
    <Card className="my-8 border-2 border-muted overflow-hidden max-w-2xl mx-auto shadow-md pt-0 gap-0">
      {recipe.image_url && (
        <div className="relative w-full aspect-video">
          <Image
            src={recipe.image_url}
            alt={recipe.name}
            fill
            className="object-cover !my-0 !py-0"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-3xl font-heading pt-4">
          {recipe.name}
        </CardTitle>
        {descriptionText && (
          <CardDescription className="text-base text-muted-foreground mt-2">
            {descriptionText}
          </CardDescription>
        )}
        <div className="flex gap-4 text-sm text-muted-foreground font-medium">
          {recipe.metadata?.prepTime > 0 && (
            <span>
              <strong>Prep:</strong> {recipe.metadata.prepTime} min
            </span>
          )}
          {recipe.metadata?.cookTime > 0 && (
            <span>
              <strong>Cook:</strong> {recipe.metadata.cookTime} min
            </span>
          )}
          {recipe.metadata?.recipeYield && (
            <span>
              <strong>Yield:</strong> {recipe.metadata.recipeYield}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-heading mb-4 border-b pt-0 pb-2">
            Ingredients
          </h3>
          <ul className="space-y-2">
            {recipe.ingredients?.map((ing, i) => {
              const name = ing.content?.content?.[0]?.content?.[0]?.text;
              return (
                <li
                  key={`${name || "ing"}-${i}`}
                  className="flex justify-between items-center py-1 border-b border-muted/30 last:border-0"
                >
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="text-muted-foreground text-sm">
                    {ing.quantity}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-heading mb-4 border-b pb-2">
            Instructions
          </h3>
          <ol className="list-decimal list-outside ml-5 space-y-4">
            {recipe.steps?.map((step, i) => {
              const text = step.content?.[0]?.content?.[0]?.text;
              return (
                <li
                  key={text?.substring(0, 20) || `step-${i}`}
                  className="text-foreground leading-relaxed pl-2"
                >
                  {text}
                </li>
              );
            })}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
