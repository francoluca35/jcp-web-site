import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import { Badge } from "./ui/badge";
import { Zap, Gauge, Wrench } from "lucide-react";

const machines = [
  {
    id: 1,
    name: "Horno Industrial Rotativo",
    description: "Horno de convección rotativo para alta producción. Capacidad hasta 80 panes por tanda.",
    image: "https://images.unsplash.com/photo-1656180384586-0f1cde47a9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnJlYWQlMjBvdmVufGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Control digital", "Eficiencia energética", "Garantía 2 años"],
    price: "Desde €15.500",
    category: "Hornos"
  },
  {
    id: 2,
    name: "Amasadora Espiral Industrial",
    description: "Amasadora de espiral para grandes volúmenes. Ideal para masas de pan y pizza.",
    image: "https://images.unsplash.com/photo-1703607888337-aae6d77b3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWl4ZXIlMjBiYWtlcnl8ZW58MXx8fHwxNzU2NDk0MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Capacidad 50kg", "Motor potente", "Acero inoxidable"],
    price: "Desde €8.900",
    category: "Amasadoras"
  },
  {
    id: 3,
    name: "Línea de Producción Completa",
    description: "Sistema automatizado completo para producción en masa de pan y bollería.",
    image: "https://images.unsplash.com/photo-1572081608077-1af152703136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwcm9kdWN0aW9uJTIwbGluZXxlbnwxfHx8fDE3NTY0OTQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Totalmente automatizada", "Alta capacidad", "Instalación incluida"],
    price: "Consultar precio",
    category: "Líneas completas"
  }
];

export function MachinesSection() {
  return (
    <section id="maquinas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nuestras Máquinas Industriales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Equipamiento de última generación para optimizar tu producción de panadería. 
            Tecnología europea con garantía y servicio técnico especializado.
          </p>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machines.map((machine) => (
            <Card key={machine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary">
                  {machine.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{machine.name}</CardTitle>
                <CardDescription>{machine.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Features */}
                <div className="space-y-2 mb-4">
                  {machine.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      {index === 0 && <Zap className="h-4 w-4 text-blue-600" />}
                      {index === 1 && <Gauge className="h-4 w-4 text-green-600" />}
                      {index === 2 && <Wrench className="h-4 w-4 text-orange-600" />}
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-primary">{machine.price}</div>
                  <Button variant="outline" size="sm">
                    Más Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Button size="lg">Ver Catálogo Completo</Button>
        </div>
      </div>
    </section>
  );
}
