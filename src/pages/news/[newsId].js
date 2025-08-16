import { useRouter } from "next/router";
import Image from "next/image";

export default function News() {
  const router = useRouter();
  const { newsId } = router.query;

  return (
    <div className="min-h-screen py-24 px-24 bg-gray-100">
      {/* image header */}
      <div className="relative w-full h-96">
        <Image
          src={`/header/home.jpg`}
          alt={`News Article ${newsId}`}
          fill={true}
          className="rounded-3xl object-cover"
        />
      </div>

      {/* content */}
      <div className="mt-8 text-black w-full text-justify">
        <h1 className="text-3xl font-bold">News Article {newsId}</h1>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id suscipit augue. Mauris finibus erat cursus
          urna efficitur porttitor. Donec dapibus nulla aliquet sapien convallis pharetra. Donec scelerisque lectus in
          eleifend consequat. Morbi sed condimentum est. Quisque in lectus eu orci porttitor egestas non sed velit.
          Suspendisse et dolor non turpis faucibus fermentum sit amet quis mi. Cras id vehicula purus. Ut tempor ante
          ultrices urna rhoncus, eu luctus sapien posuere. Aenean ultricies lacinia lacus eget finibus. In ornare elit
          ligula, a porta est condimentum ac. Cras quis nisl vitae dui blandit porttitor nec vel tellus. Duis et ligula
          lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed viverra
          libero sed varius feugiat. Donec tincidunt placerat metus, a commodo est consequat eu. Praesent sagittis
          molestie efficitur. Nam a sodales nunc, a malesuada eros. Vivamus ullamcorper augue turpis, vitae interdum
          tellus dapibus vitae. Duis mollis dapibus turpis, et feugiat eros pharetra non. Quisque elementum commodo
          semper. Proin aliquam augue at felis consequat, at placerat quam commodo. Pellentesque dignissim rutrum nisl
          eu tempor. Morbi nunc eros, pretium sed bibendum et, vestibulum ut velit. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Ut porttitor, lectus et viverra mattis, justo
          ipsum condimentum urna, sed posuere quam eros sit amet dolor. Praesent arcu massa, elementum eget placerat a,
          eleifend quis metus. Duis sit amet tellus vitae lectus lacinia rutrum suscipit id ligula. Mauris urna nisi,
          fringilla faucibus nisi id, tempor porta lacus. Nulla consequat, enim sit amet volutpat scelerisque, justo
          lacus tincidunt erat, nec elementum lectus justo in sapien. Nam ornare, leo vitae condimentum venenatis, neque
          risus maximus purus, a fringilla augue urna eget elit. Sed magna quam, porttitor in eleifend ac, rhoncus sed
          orci. Fusce vestibulum lacus ac mauris feugiat, eu porttitor dui sagittis. Praesent sit amet dui suscipit,
          sollicitudin risus ac, lacinia magna. Curabitur malesuada non velit quis maximus. Sed vitae vestibulum ligula.
          Cras rutrum congue arcu, in porta ipsum finibus in. Aliquam venenatis vitae ipsum ut facilisis. Donec blandit
          libero sed purus imperdiet commodo. Nulla luctus ex nibh, id dictum tortor vehicula pharetra. Sed consectetur
          porta eleifend. Suspendisse ultricies, urna at posuere feugiat, sem magna pulvinar lacus, ut tristique tortor
          ante sed arcu. Curabitur sit amet tincidunt mi. Integer sit amet imperdiet nulla. Sed at erat finibus, lacinia
          augue a, commodo neque. Sed facilisis blandit purus non gravida. Donec at neque in felis suscipit suscipit vel
          id nisl. Phasellus varius, nulla et dictum venenatis, arcu ipsum gravida lorem, at auctor urna nunc sit amet
          orci. Pellentesque ultricies nisl a tellus feugiat lacinia. Vivamus tincidunt posuere nunc id luctus. Ut
          hendrerit a massa ut auctor. Pellentesque cursus dapibus augue, vel ornare arcu molestie a. Morbi egestas
          finibus metus sed dictum. Ut iaculis mauris at sem interdum, quis pretium leo sollicitudin. Donec ut sapien
          faucibus, lobortis eros sed, iaculis arcu. Ut mauris elit, semper ut sapien at, euismod euismod turpis. Cras
          eu tempor dolor. Cras ac leo vitae nibh ullamcorper vehicula id vel dui. Aliquam pulvinar at elit faucibus
          tempus. Sed eros urna, molestie id odio sit amet, euismod laoreet nisi. Suspendisse tempus imperdiet ligula,
          vel laoreet nunc maximus non. Aliquam erat volutpat. Integer fermentum porta consectetur. Integer arcu ipsum,
          luctus a pretium in, feugiat quis enim. Pellentesque gravida interdum enim pulvinar condimentum. Nam malesuada
          sollicitudin enim in ultrices. Etiam ultricies, eros sed vehicula dictum, odio sem facilisis lorem, nec
          volutpat turpis nisl vel leo. Vestibulum egestas mauris blandit, pulvinar dui at, rhoncus diam.
        </p>
      </div>
    </div>
  );
}
